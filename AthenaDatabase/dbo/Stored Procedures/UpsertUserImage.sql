CREATE PROCEDURE [dbo].[UpsertUserImage]
	@UserID uniqueidentifier,
	@ImageURL nvarchar(200)
AS
BEGIN
	-- Check to see if there's a value in the table for this already, and update it if so
	IF EXISTS(SELECT UserID FROM dbo.UserImage WHERE UserID = @UserID)
	BEGIN
		UPDATE dbo.UserImage
		SET [URL] = @ImageURL
		WHERE UserID = @UserID
	END
	ELSE
	-- If not, then insert a new row
	BEGIN
		INSERT INTO dbo.UserImage (UserID, [URL]) VALUES (@UserID, @ImageURL)
	END
END