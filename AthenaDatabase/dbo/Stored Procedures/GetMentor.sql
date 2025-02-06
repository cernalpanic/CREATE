CREATE PROCEDURE [dbo].[GetMentor]
	@MentorID uniqueidentifier
AS
BEGIN
	SELECT MentorID, [Availability], JobTitle, FirstName, LastName, Email, [URL]
	FROM dbo.[Mentor] AS m
	JOIN dbo.[User] AS u ON u.UserID = m.UserID
	JOIN dbo.[UserImage] AS ui ON u.UserID = ui.UserID 
	WHERE MentorID = @MentorID
END
