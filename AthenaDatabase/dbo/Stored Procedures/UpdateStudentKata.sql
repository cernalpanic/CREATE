CREATE PROCEDURE [dbo].[UpdateStudentKata]
	@KataID uniqueidentifier,
    @StudentID uniqueidentifier,
	@CompletionTime varchar(15)	= NULL,
	@StudentCode TEXT = NULL,
	@StudentNotes TEXT	= NULL,
	@AdminFeedback TEXT	= NULL,
    @Complete BIT = 0
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS (SELECT 1 FROM dbo.StudentKata WHERE KataID = @KataID AND StudentID = @StudentID
    )

	BEGIN
		UPDATE dbo.[StudentKata]
		SET [CompletionTime] = @CompletionTime, [StudentCode] = @StudentCode, [StudentNotes] = @StudentNotes, [AdminFeedback] = @AdminFeedback, [Complete] = @Complete
		WHERE KataID = @KataID AND StudentID = @StudentID
		
		SET @Result = 1		-- Returns true (update was successful)
	END
	ELSE
	BEGIN
		SET @Result = 0		-- Returns false (update was not successful)
	END
	SELECT @Result
END