CREATE PROCEDURE [dbo].[AddExample]
    @ExampleCode TEXT = '',
    @KataID UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @KataExampleID UNIQUEIDENTIFIER = NEWID()

    BEGIN

        -- Insert the kataExample record
        INSERT INTO dbo.[KataExamples] 
        (KataExampleID, KataID, [ExampleCode]) 
        VALUES (@KataExampleID, @KataID, @ExampleCode)

        -- Return the newly inserted kataExample
        SELECT * FROM dbo.[KataExamples] WHERE KataExampleID = @KataExampleID;
    END
END