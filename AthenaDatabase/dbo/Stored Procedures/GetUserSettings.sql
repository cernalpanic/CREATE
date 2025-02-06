CREATE PROCEDURE [dbo].[GetUserSettings]
	@RoleID uniqueidentifier
AS
BEGIN
	-- First we need to get the UserID from the RoleID
	DECLARE @UserID uniqueidentifier
	DECLARE @Role nvarchar(10)
	IF EXISTS(SELECT UserID FROM dbo.Student WHERE StudentID = @RoleID)
	BEGIN
		SET @UserID = (SELECT UserID FROM dbo.Student WHERE StudentID = @RoleID)
		SET @Role = 'Student'
	END
	ELSE
	BEGIN
		SET @UserID = (SELECT UserID FROM dbo.Mentor WHERE MentorID = @RoleID)
		SET @Role = 'Mentor'
	END

	-- Safety net just in case there is no UserImage for some reason
	IF NOT EXISTS(SELECT [URL] FROM dbo.UserImage WHERE UserID = @UserID)
	BEGIN
		EXEC UpsertUserImage @UserID = @UserID, @ImageURL = ''
	END

	DECLARE @query nvarchar(max) = '
	SELECT u.UserID, FirstName, LastName, Email, [URL], [Availability]'

	IF (@Role = 'Mentor')
	BEGIN
		SET @query = @query + ', JobTitle'
	END

	SET @query = @query + ' FROM dbo.[User] AS u JOIN dbo.[UserImage] AS ui ON u.UserID = ui.UserID 
			JOIN dbo.' + @Role + ' AS r ON r.UserID = u.UserID 
			WHERE u.UserID = @UserID'

	DECLARE @params nvarchar(max) = '@UserID uniqueidentifier'
	EXEC sp_executesql @query, @params, @UserID
END
