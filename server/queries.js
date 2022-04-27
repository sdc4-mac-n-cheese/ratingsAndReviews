exports.reviews = `
  SELECT array(
  SELECT jsonb_build_object(
      'product', product_id,
      'rating', rating,
      'summary', summary,
      'recommend', recommend,
      'response', response,
      'body', body,
      'date', date,
      'reviewer_name', reviewer_name,
      'helpfulness', helpfulness,
      'photos', (
        SELECT ARRAY(
        SELECT json_build_object(
          'id', review_photos.id,
          'url', review_photos.url
        ))
      ))
    FROM review
    INNER JOIN review_photos
    ON review_photos.id = review.id
    WHERE product_id = $3
    ORDER BY date DESC
    LIMIT $1 OFFSET $2
    ) as results`

// jsonb_object_agg(name, value)

exports.meta = `
  SELECT jsonb_build_object(
    'product_id', product_id,

    'ratings', (
      SELECT jsonb_object_agg(rating, value)
        FROM (SELECT rating, COUNT(rating) as value FROM review WHERE product_id = $1 GROUP BY rating)
      as rating),

    'recommend', (
      SELECT jsonb_build_object(
        'true', (SELECT COUNT(recommend) FROM review WHERE recommend = true AND product_id = $1),
        'false', (SELECT COUNT(recommend) FROM review WHERE recommend = false AND product_id = $1)
      )
    ),

    'characteristics', (
      SELECT (
        json_object_agg(
          name, jsonb_build_object(
            'id', id,
            'value', avg
          )))
      FROM (SELECT characteristics.name, characteristics.id, avg(characteristic_reviews.value)
      FROM characteristics
      INNER JOIN characteristic_reviews
      ON characteristics.id = characteristic_reviews.characteristic_id
      WHERE characteristics.product_id = $1
      GROUP BY characteristics.id)
      AS alias)

  ) as data
  FROM review
  WHERE product_id = $1`;


exports.markHelpful = `
  UPDATE review SET helpfulness = helpfulness + 1 WHERE id = $1
`

exports.markReported = `
  UPDATE review SET reported = true WHERE id = $1
`

exports.postreview = `
  INSERT INTO review (
    product_id,
    rating,
    date,
    summary,
    body,
    recommend,
    reported,
    reviewer_name,
    reviewer_email,
    response,
    helpfulness
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
  )
`