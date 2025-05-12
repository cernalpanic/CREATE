CREATE PROCEDURE [dbo].[GetStudents]
AS
BEGIN
	SELECT StudentID, [Exp], [Availability], FirstName, LastName, Email, CurrentStandupStreak, LongestStandupStreak, [URL]
	FROM dbo.[Student] AS st
	JOIN dbo.[User] AS u ON u.UserID = st.UserID
	JOIN dbo.[UserImage] AS ui ON u.UserID = ui.UserID 
	ORDER BY LastName
END