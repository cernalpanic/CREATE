CREATE PROCEDURE [dbo].[GetStudentQuests]
    @StudentID UNIQUEIDENTIFIER,
    @ModuleID UNIQUEIDENTIFIER
    AS
    BEGIN
        SET NOCOUNT ON;
        IF @StudentID IS NULL OR @StudentID = '00000000-0000-0000-0000-000000000000'
            BEGIN
            SELECT
                sq.StudentID,
                sq.QuestID,
                ModuleID,
                q.[Name],
                q.[Description],
                ExpGain,
                Available,
                sq.Completed,
                sq.LastActivityDate
            FROM
                StudentQuests AS sq
            INNER JOIN dbo.Quest AS q ON q.QuestID = sq.QuestID
            INNER JOIN dbo.PostQuest AS pq ON pq.QuestID = sq.QuestID
            WHERE
                ModuleID = @ModuleID
            END
        ELSE
        BEGIN
        SELECT
            StudentID,
            sq.QuestID,
            ModuleID,
            [Name],
            [Description],
            ExpGain,
            Available,
            Completed,
            LastActivityDate
        FROM
            StudentQuests AS sq
        INNER JOIN dbo.Quest AS q ON q.QuestID = sq.QuestID
        INNER JOIN dbo.PostQuest AS pq ON pq.QuestID = sq.QuestID
        WHERE
            StudentID = @StudentID AND ModuleID = @ModuleID
        END

        SELECT 
            q.QuestID,
            ModuleID,
            [Name],
            [Description],
            ExpGain,
            Available
        FROM 
            dbo.Quest AS q
        JOIN dbo.PostQuest AS pq ON pq.QuestID = q.QuestID
        WHERE ModuleID = @ModuleID
    END
    GO