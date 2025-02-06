CREATE PROCEDURE [dbo].[GetOverallProgress]
	@StudentID uniqueidentifier
AS
BEGIN
	CREATE TABLE #Temp (
	    [OverallExp] int, 
        [StudentExp] int
    )

	DECLARE @OverallExp int = (
		SELECT SUM(ExpGain) 
		FROM dbo.Quest AS q
			JOIN dbo.PostQuest AS pq ON q.QuestID = pq.QuestID
		WHERE Available = 1
	)
	DECLARE @StudentExp int = (
		SELECT SUM(ExpGain) 
		FROM dbo.StudentQuests AS sq
			JOIN dbo.Quest AS q ON sq.QuestID = q.QuestID
			JOIN dbo.PostQuest AS pq ON pq.QuestID = sq.QuestID
		WHERE StudentID = @StudentID 
			AND pq.Available = 1
			AND sq.Completed = 1
	)

	INSERT INTO #Temp (OverallExp, StudentExp) VALUES (@OverallExp, @StudentExp)
	SELECT * FROM #Temp
END
