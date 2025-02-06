CREATE PROCEDURE [dbo].[UpdateModule]
	@ModuleID uniqueidentifier,
	@Name nvarchar(256),
	@Color nvarchar(6),
	@Description nvarchar(max)
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS(SELECT ModuleID FROM dbo.[Module] WHERE ModuleID = @ModuleID)
	BEGIN
		UPDATE dbo.[Module]
		SET [Name] = @Name,
			[Color] = @Color,
			[Description] = @Description
		WHERE ModuleID = @ModuleID
		
		SET @Result = 1		-- Returns true (update was successful)
	END
	ELSE
	BEGIN
		SET @Result = 0		-- Returns false (update was not successful)
	END
	SELECT @Result
END
