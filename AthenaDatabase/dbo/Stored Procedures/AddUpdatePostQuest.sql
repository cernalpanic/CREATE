CREATE PROCEDURE [dbo].[AddUpdatePostQuest]
	@QuestID uniqueidentifier,
	@Available bit
AS
BEGIN
	DECLARE @OutputTable TABLE (Available bit);

    MERGE INTO PostQuest AS target
    USING (SELECT @QuestID AS QuestID, @Available AS Available) AS source
    ON (target.QuestID = source.QuestID)
    WHEN MATCHED THEN
        UPDATE SET
            target.Available = source.Available
    WHEN NOT MATCHED BY TARGET THEN
        INSERT (QuestID, Available)
        VALUES (source.QuestID, source.Available)
    OUTPUT INSERTED.Available INTO @OutputTable;

        -- Check the number of rows affected
    IF @@ROWCOUNT > 0
        RETURN 1; -- True, record was inserted or updated
    ELSE
        RETURN 0; -- False, no record was affected
END