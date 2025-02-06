CREATE PROCEDURE [dbo].[GetStudentMentors]
	@StudentID UNIQUEIDENTIFIER
AS
BEGIN
	SELECT sm.[MentorID], m.[UserID], [JobTitle], [Availability], u.[FirstName], u.[LastName], [Email], [URL]
	FROM dbo.[StudentMentor] AS sm
	INNER JOIN dbo.[Mentor] AS m ON sm.[MentorID] = m.[MentorID]
	INNER JOIN dbo.[User] AS u ON m.[UserID] = u.[UserID]
	INNER JOIN dbo.[UserImage] AS ui ON ui.UserID = u.UserID 
	WHERE StudentID = @StudentID
END
