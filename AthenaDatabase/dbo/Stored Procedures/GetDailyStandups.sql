CREATE PROCEDURE [dbo].[GetDailyStandups]
	@StudentID UNIQUEIDENTIFIER
AS
BEGIN
	SELECT ds.StandupID, ds.[StudentID], ds.[UserID], [DateCreated] AS Date_Created, ds.[YesterdayTask], ds.[TodayPlan], ds.[Blockers], ds.[AdminFeedback]
	FROM dbo.[DailyStandup] AS ds
	WHERE StudentID = @StudentID
	ORDER BY Date_Created DESC
END