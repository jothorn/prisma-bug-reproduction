-- @param {String} $1:stringParam
-- @param {Int} $2:intParam

SELECT :intParam
FROM "User" AS u
WHERE u.name = :stringParam
