-- @param {String} $1:userName
-- @param {Int} $2:postID

SELECT
    u.name,
    p.id
FROM "User" AS u
LEFT JOIN
    "Post" AS p
    ON
        u.id = p.user_id
        AND p.id = :postID
WHERE
    u.name = :userName
