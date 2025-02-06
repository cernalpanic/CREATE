CREATE PROCEDURE [dbo].[GetUserImage]
	@RoleID uniqueidentifier
AS
BEGIN
-- First we need to get the UserID from the RoleID
	DECLARE @UserID uniqueidentifier
	IF EXISTS(SELECT UserID FROM dbo.Student WHERE StudentID = @RoleID)
	BEGIN
		SET @UserID = (SELECT UserID FROM dbo.Student WHERE StudentID = @RoleID)
	END
	ELSE
	BEGIN
		SET @UserID = (SELECT UserID FROM dbo.Mentor WHERE MentorID = @RoleID)
	END

	-- Then return the URL
	SELECT [URL] FROM dbo.UserImage WHERE UserID = @UserID
END
