CREATE PROCEDURE [dbo].[AddAuthentication]
	@Email nvarchar(256),
	@Password nvarchar(256),
	@OneMonth datetime
AS
BEGIN
	DECLARE @Role nvarchar(50)
	DECLARE @AuthToken uniqueidentifier

	IF NOT EXISTS(SELECT UserID FROM dbo.[User] WHERE [Email] = @Email AND [Password] = @Password)
	BEGIN
		-- Login could not be authenticated, so return a result of false and an invalid Guid (default Guid)
		SET @Role = NULL
		SET @AuthToken = '00000000-0000-0000-0000-000000000000'
	END
	ELSE
	BEGIN
		-- Login was authenticated! Let's remove any previous data in the Authentication table and then insert the new data
		DECLARE @UserID uniqueidentifier = (SELECT UserID FROM dbo.[User] WHERE [Email] = @Email AND [Password] = @Password)

		-- If we find the userID in the Student table, then the role is student
		IF EXISTS(SELECT UserID FROM dbo.Student WHERE UserID = @UserID)
		BEGIN
			SET @Role = 'Student'
		END
		ELSE	-- If not, then the role is mentor
		BEGIN
			SET @Role = 'Mentor'
		END

		DELETE FROM dbo.[Authentication] WHERE UserID = @UserID

		SET @AuthToken = NEWID()

		INSERT INTO dbo.[Authentication] (TokenID, UserID, [Role], Expires) 
		VALUES (@AuthToken, @UserID, @Role, @OneMonth)
		
	END
	-- Retrieve the authentication information
	EXEC GetAuthentication @TokenID = @AuthToken; 
END
