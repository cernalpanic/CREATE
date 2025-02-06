CREATE PROCEDURE [dbo].[GetDailyStandups]
	@StudentID UNIQUEIDENTIFIER
AS
BEGIN
	SELECT ds.StandupID, ds.[StudentID], ds.[UserID], [DateCreated] AS Date_Created, [Description]
	FROM dbo.[DailyStandup] AS ds
	WHERE StudentID = @StudentID
	ORDER BY Date_Created DESC
END