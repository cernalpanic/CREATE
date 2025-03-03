CREATE PROCEDURE [dbo].[UpdateStudent]
	@StudentID uniqueidentifier,
	@Exp int					= NULL,
	@Availability nvarchar(256)	= NULL,
	@CurrentStandupStreak int	= NULL,
	@LongestStandupStreak int	= NULL
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS(SELECT StudentID FROM dbo.[Student] WHERE StudentID = @StudentID)
	BEGIN
		UPDATE dbo.[Student]
		SET [Exp] = @Exp,
			[Availability] = @Availability,
			[CurrentStandupStreak] = @CurrentStandupStreak,
			[LongestStandupStreak] = @LongestStandupStreak
		WHERE StudentID = @StudentID
		
		SET @Result = 1		-- Returns true (update was successful)
	END
	ELSE
	BEGIN
		SET @Result = 0		-- Returns false (update was not successful)
	END
	SELECT @Result
END
