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
    ON review.id = review_photos.id
    WHERE product_id = $3
    ORDER BY date ASC
    LIMIT $1 OFFSET $2
    ) as results`

// exports.reviews = `
//   SELECT array_agg(
//     jsonb_build_object(
//       'product_id', product_id,
//       'rating', rating,
//       'summary', summary,
//       'recommend', recommend,
//       'response', response,
//       'body', body,
//       'date', date,
//       'reviewer_name', reviewer_name,
//       'helpfulness', helpfulness
//       )
//     )
//     FROM review
//     LIMIT $1 OFFSET $2`

exports.meta = `
  SELECT json_build_object(
    'characteristic_id', characteristic_id,
    'review_id', review_id,
    'value', value)
  FROM characteristic_reviews`



exports.markHelpful = `
  UPDATE review SET helpfulness = helpfulness + 1 WHERE id = $1
`

exports.markReported = `
  UPDATE review SET reported = true WHERE id = $1
`