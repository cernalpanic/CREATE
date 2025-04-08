CREATE PROCEDURE [dbo].[GetStudentKatas]
    @StudentID uniqueidentifier,
    @KataID uniqueidentifier = NULL
AS
BEGIN

    SELECT @KataID = KataID FROM dbo.StudentKata WHERE StudentID = @StudentID

	SELECT K.KataID, K.[Description], K.DateAssigned, K.KataName, 
        SK.StudentID, SK.UserID, SK.Complete, SK.CompleteDate, SK.CompletionTime, SK.StudentCode,
        SK.StudentNotes, SK.AdminFeedback
	FROM dbo.[StudentKata] SK
    RIGHT JOIN dbo.Kata K ON SK.KataID = K.KataID
	WHERE K.KataID = @KataID AND SK.StudentID = @StudentID
END