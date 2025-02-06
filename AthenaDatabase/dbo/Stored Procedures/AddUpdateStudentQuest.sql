CREATE PROCEDURE [dbo].[AddUpdateStudentQuest]
    @StudentID uniqueidentifier,
    @QuestID uniqueidentifier,
    @ModuleID uniqueidentifier,
    @Completed bit,
    @LastActivityDate datetime
AS
BEGIN
    -- Declare a table variable to capture the output of the MERGE statement
    DECLARE @OutputTable TABLE (Completed bit);

    MERGE INTO StudentQuests AS target
    USING (SELECT @StudentID AS StudentID, @QuestID AS QuestID, @Completed AS Completed, @LastActivityDate AS LastActivityDate) AS source
    ON (target.StudentID = source.StudentID AND target.QuestID = source.QuestID)
    WHEN MATCHED THEN
        UPDATE SET
            target.Completed = source.Completed,
            target.LastActivityDate = source.LastActivityDate
    WHEN NOT MATCHED BY TARGET THEN
        INSERT (StudentID, QuestID, Completed, LastActivityDate)
        VALUES (source.StudentID, source.QuestID, source.Completed, source.LastActivityDate)
    OUTPUT INSERTED.Completed INTO @OutputTable;

    -- Check to see if student is added to StudentModule table; if not, update it
    IF NOT EXISTS(SELECT * FROM dbo.StudentModules WHERE ModuleID = @ModuleID AND StudentID = @StudentID)
    BEGIN
        INSERT INTO dbo.StudentModules(StudentID, ModuleID, Completed)
            VALUES (@StudentID, @ModuleID, 0)
    END

    -- Finds the number of quests in the module that are posted 
    DECLARE @AvailableModuleQuests int = (
        SELECT COUNT(q.QuestID) 
        FROM dbo.Quest AS q
            JOIN dbo.PostQuest AS pq ON q.QuestID = pq.QuestID
        WHERE ModuleID = @ModuleID AND Available = 1
    )
    -- Finds the number of quests in the module the student has completed
    DECLARE @CompletedModuleQuests int = (
        SELECT COUNT(sq.QuestID)
        FROM dbo.StudentQuests AS sq
            JOIN dbo.Quest AS q ON sq.QuestID = q.QuestID
        WHERE ModuleID = @ModuleID AND StudentID = @StudentID AND Completed = 1
    )
    -- If these numbers are the same, the student has completed the module, so update the table
    IF (@AvailableModuleQuests = @CompletedModuleQuests)
    BEGIN
        UPDATE dbo.StudentModules
            SET Completed = 1
            WHERE StudentID = @StudentID AND ModuleID = @ModuleID
    END

    -- Now declare a scalar variable to hold the result
    DECLARE @Result bit;

    -- Retrieve the result from the table variable
    SELECT TOP 1 @Result = Completed FROM @OutputTable;

    -- Return the result
    RETURN @Result;
END