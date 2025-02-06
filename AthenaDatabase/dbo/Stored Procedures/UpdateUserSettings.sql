CREATE PROCEDURE [dbo].[UpdateUserSettings]
	@RoleID uniqueidentifier,
	@FirstName nvarchar(100),
	@LastName nvarchar(100),
	@Email nvarchar(100),
	@Password nvarchar(100) = NULL,
	@ImageURL nvarchar(200),
	@Availability nvarchar(256),
	@JobTitle nvarchar(100)
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

	IF (@Password IS NULL)
	BEGIN
		UPDATE dbo.[User]
		SET FirstName = @FirstName,
			LastName = @LastName,
			Email = @Email
		WHERE UserID = @UserID
	END
	ELSE
	BEGIN
		UPDATE dbo.[User]
		SET FirstName = @FirstName,
			LastName = @LastName,
			Email = @Email,
			[Password] = @Password
		WHERE UserID = @UserID
	END

	IF (@Role = 'Student')
	BEGIN
		UPDATE dbo.[Student]
		SET [Availability] = @Availability
		WHERE UserID = @UserID
	END
	If (@Role = 'Mentor')
	BEGIN
		UPDATE dbo.[Mentor]
		SET [Availability] = @Availability,
			JobTitle = @JobTitle
		WHERE UserID = @UserID
	END

	EXEC UpsertUserImage @UserID = @UserID, @ImageURL = @ImageURL
END
