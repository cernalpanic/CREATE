CREATE PROCEDURE [dbo].[UpdateMentor]
	@MentorID uniqueidentifier,
	@JobTitle int				= NULL,
	@Availability nvarchar(256)	= NULL
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS(SELECT MentorID FROM dbo.[Mentor] WHERE MentorID = @MentorID)
	BEGIN
		UPDATE dbo.[Mentor]
		SET [JobTitle] = @JobTitle,
			[Availability] = @Availability
		WHERE MentorID = @MentorID
		
		SET @Result = 1		-- Returns true (update was successful)
	END
	ELSE
	BEGIN
		SET @Result = 0		-- Returns false (update was not successful)
	END
	SELECT @Result
END
