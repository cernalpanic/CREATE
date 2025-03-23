CREATE PROCEDURE [dbo].[AddStudentKata]
    @StudentID UNIQUEIDENTIFIER,
    @KataID UNIQUEIDENTIFIER
AS
BEGIN
	DECLARE @UserID UNIQUEIDENTIFIER
    -- Get the UserID associated with the provided StudentID
    SELECT @UserID = UserID FROM dbo.Student WHERE StudentID = @StudentID

    BEGIN

        -- Insert the studentkata record
        INSERT INTO dbo.[StudentKata] 
        (StudentID, UserID, KataID, [Complete], [CompleteDate], [CompletionTime], [StudentCode], [StudentNotes], [AdminFeedback]) 
        VALUES (@StudentID, @UserID, @KataID, 0, NULL, '', '', '', '')

        -- Return the newly inserted studentkata
        SELECT * FROM dbo.[StudentKata] WHERE KataID = @KataID AND StudentID = @StudentID;
    END
END