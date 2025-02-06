CREATE PROCEDURE [dbo].[GetQuestsWithStatus]
    @ModuleID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Sync missing entries from Quest to PostQuest
    INSERT INTO [dbo].[PostQuest] (QuestID, Available)
    SELECT q.QuestID, 0 AS Available  -- Default Available to false
    FROM [dbo].[Quest] AS q
    WHERE NOT EXISTS (
        SELECT 1
        FROM [dbo].[PostQuest] AS pq
        WHERE pq.QuestID = q.QuestID
    );

    -- Select all quests with their posting status
    SELECT q.QuestID, q.ModuleID, q.Name, q.Description, q.ExpGain, pq.Available
    FROM [dbo].[Quest] AS q
    INNER JOIN [dbo].[PostQuest] AS pq ON q.QuestID = pq.QuestID
    WHERE ModuleID = @ModuleID
END;
GO