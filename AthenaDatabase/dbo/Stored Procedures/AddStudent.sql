CREATE PROCEDURE [dbo].[AddStudent]
	@UserID uniqueidentifier
AS
BEGIN
	DECLARE @StudentID uniqueidentifier = NEWID()
	INSERT INTO dbo.[Student] 
	(UserID, StudentID, [Exp], [Availability],[CurrentStandupStreak], [LongestStandupStreak]) 
	VALUES(@UserID, @StudentID, 0, '', 0, 0)

	INSERT INTO dbo.UserImage (UserID, [URL]) VALUES (@UserID, '')

	-- Now return the student we just inserted
	EXEC GetStudent @StudentID = @StudentID; 
END
