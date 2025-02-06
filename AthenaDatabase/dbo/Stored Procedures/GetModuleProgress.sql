CREATE PROCEDURE [dbo].[GetModuleProgress]
	@StudentID uniqueidentifier,
	@Details bit
AS
BEGIN
	IF (@Details = 0)
	BEGIN
		DROP TABLE IF EXISTS #Temp
		CREATE TABLE #Temp (
			[ModuleID] uniqueidentifier,
			[Name] nvarchar(256),
			[Color] nvarchar(6),
			[QuestsCompleted] int,
			[QuestsAvailable] int
		)

		INSERT INTO #Temp ([ModuleID], [Name], [Color], [QuestsCompleted], [QuestsAvailable]) 
			SELECT sm.[ModuleID], [Name], [Color], NULL, NULL 
			FROM dbo.Module AS m 
				LEFT JOIN dbo.StudentModules AS sm ON m.ModuleID = sm.ModuleID
			WHERE StudentID = @StudentID

		INSERT INTO #Temp ([ModuleID], [Name], [Color], [QuestsCompleted], [QuestsAvailable])
			SELECT m.[ModuleID], [Name], [Color], NULL, NULL
			FROM dbo.Module AS m
			WHERE m.ModuleID NOT IN(SELECT ModuleID FROM #Temp)

		UPDATE #Temp
			SET QuestsCompleted = (
				SELECT COUNT(sq.QuestID) FROM dbo.StudentQuests AS sq JOIN dbo.Quest AS q ON sq.QuestID = q.QuestID 
				WHERE ModuleID = #Temp.ModuleID AND StudentID = @StudentID AND Completed = 1
			),
			QuestsAvailable = (
				SELECT COUNT(q.QuestID) FROM dbo.Quest AS q JOIN dbo.PostQuest AS pq ON q.QuestID = pq.QuestID
				WHERE ModuleID = #Temp.ModuleID AND Available = 1
			)
		SELECT * FROM #Temp
	END
	ELSE
	BEGIN
		DROP TABLE IF EXISTS #TempDetails
			CREATE TABLE #TempDetails (
				[ModuleID] uniqueidentifier,
				[Name] nvarchar(256),
				[Color] nvarchar(6),
				[QuestID] uniqueidentifier,
				[QuestName] nvarchar(256),
				[Completed] bit
			)

			INSERT INTO #TempDetails ([ModuleID], [Name], [Color], [QuestID], [QuestName], [Completed])
				SELECT sm.[ModuleID], m.[Name], [Color], sq.QuestID, q.[Name] AS [QuestName], sq.[Completed]
				FROM dbo.Quest AS q 
					JOIN dbo.Module AS m ON q.ModuleID = m.ModuleID
					LEFT JOIN dbo.StudentModules AS sm ON sm.ModuleID = m.ModuleID
					LEFT JOIN dbo.StudentQuests AS sq ON sq.QuestID = q.QuestID
					JOIN dbo.PostQuest AS pq on q.QuestID = pq.QuestID
				WHERE sm.StudentID = @StudentID AND sq.StudentID = @StudentID AND Available = 1

			INSERT INTO #TempDetails ([ModuleID], [Name], [Color], [QuestID], [QuestName], [Completed])
				SELECT m.ModuleID, m.[Name], [Color], q.[QuestID], q.[Name] AS [QuestName], 0
				FROM dbo.Quest AS q
					JOIN dbo.Module AS m ON q.ModuleID = m.ModuleID
					JOIN dbo.PostQuest AS pq ON q.QuestID = pq.QuestID
				WHERE q.QuestID NOT IN (SELECT QuestID FROM #TempDetails) AND Available = 1

			SELECT * FROM #TempDetails
			ORDER BY [Name]
	END
END
