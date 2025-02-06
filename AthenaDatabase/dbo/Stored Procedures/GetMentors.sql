CREATE PROCEDURE [dbo].[GetMentors]
AS
BEGIN
	SELECT MentorID, JobTitle, [Availability], FirstName, LastName, Email, [URL]
	FROM dbo.[Mentor] AS mt
	JOIN dbo.[User] AS u ON u.UserID = mt.UserID
	JOIN dbo.[UserImage] AS ui ON u.UserID = ui.UserID 
	ORDER BY LastName
END