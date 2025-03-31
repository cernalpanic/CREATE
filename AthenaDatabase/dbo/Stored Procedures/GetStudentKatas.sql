CREATE PROCEDURE [dbo].[GetStudentKatas]
	@KataID uniqueidentifier,
    @StudentID uniqueidentifier
AS
BEGIN
	SELECT K.KataID, K.[Description], K.DateAssigned, K.KataName, 
        SK.StudentID, SK.UserID, SK.Complete, SK.CompleteDate, SK.CompletionTime, SK.StudentCode,
        SK.StudentNotes, SK.AdminFeedback
	FROM dbo.[Kata] K
    RIGHT JOIN dbo.StudentKata SK ON K.KataID = SK.KataID
	WHERE K.KataID = @KataID AND SK.StudentID = @StudentID
END