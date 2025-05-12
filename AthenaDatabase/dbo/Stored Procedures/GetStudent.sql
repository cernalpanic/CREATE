CREATE PROCEDURE [dbo].[GetStudent]
	@StudentID uniqueidentifier
AS
BEGIN
	SELECT StudentID, [Exp], [Availability], FirstName, LastName, Email, [URL], [CurrentStandupStreak], [LongestStandupStreak]
	FROM dbo.[Student] AS st
	JOIN dbo.[User] AS u ON u.UserID = st.UserID
	JOIN dbo.[UserImage] AS ui ON u.UserID = ui.UserID 
	WHERE StudentID = @StudentID
	ORDER BY LastName
END
