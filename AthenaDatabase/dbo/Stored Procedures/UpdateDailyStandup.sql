CREATE PROCEDURE [dbo].[UpdateDailyStandup]
	@StandupID uniqueidentifier,
	@Description nvarchar(256)	= NULL
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS(SELECT StandupID FROM dbo.[DailyStandup] WHERE StandupID = @StandupID)
	BEGIN
		UPDATE dbo.[DailyStandup]
		SET [Description] = @Description
		WHERE StandupID = @StandupID
		
		SET @Result = 1		-- Returns true (update was successful)
	END
	ELSE
	BEGIN
		SET @Result = 0		-- Returns false (update was not successful)
	END
	SELECT @Result
END