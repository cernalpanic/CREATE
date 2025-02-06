CREATE TYPE UpdatedMentors AS TABLE 
(
    StudentID uniqueidentifier, MentorID uniqueidentifier
);
GO;
CREATE PROCEDURE [dbo].[SaveStudentMentors]
	@StudentID uniqueidentifier,
	@Updated UpdatedMentors READONLY
AS
BEGIN
	DECLARE @Result bit = 1
	DELETE FROM dbo.StudentMentor WHERE MentorID NOT IN(SELECT MentorID FROM @Updated) AND StudentID = @StudentID
	INSERT INTO dbo.StudentMentor(StudentID, MentorID) 
            SELECT StudentID, MentorID FROM @Updated WHERE MentorID NOT IN(SELECT MentorID FROM dbo.StudentMentor WHERE StudentID = @StudentID);
	SELECT @Result
END
