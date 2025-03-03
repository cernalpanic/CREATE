CREATE PROCEDURE [dbo].[UpdateDailyStandup]
	@StandupID uniqueidentifier,
	@YesterdayTask nvarchar(256)	= NULL,
	@TodayPlan nvarchar(256)	= NULL,
	@Blockers nvarchar(256)	= NULL,
	@AdminFeedback nvarchar(256)	= NULL
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS(SELECT StandupID FROM dbo.[DailyStandup] WHERE StandupID = @StandupID)
	BEGIN
		UPDATE dbo.[DailyStandup]
		SET [YesterdayTask] = @YesterdayTask, [TodayPlan] = @TodayPlan, [Blockers] = @Blockers, [AdminFeedback] = @AdminFeedback
		WHERE StandupID = @StandupID
		
		SET @Result = 1		-- Returns true (update was successful)
	END
	ELSE
	BEGIN
		SET @Result = 0		-- Returns false (update was not successful)
	END
	SELECT @Result
END