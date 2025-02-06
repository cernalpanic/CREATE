CREATE PROCEDURE [dbo].[UpdateQuest]
	@QuestID uniqueidentifier,
	@ModuleID uniqueidentifier,
	@Name nvarchar(256),
	@ExpGain int,
	@Description nvarchar(max)
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS(SELECT QuestID FROM dbo.[Quest] WHERE QuestID = @QuestID AND ModuleID = @ModuleID)
	BEGIN
		UPDATE dbo.[Quest]
		SET [Name] = @Name,
			[ExpGain] = @ExpGain,
			[Description] = @Description
		WHERE QuestID = @QuestID AND ModuleID = @ModuleID
		
		SET @Result = 1		-- Returns true (update was successful)
	END
	ELSE
	BEGIN
		SET @Result = 0		-- Returns false (update was not successful)
	END
	SELECT @Result
END
