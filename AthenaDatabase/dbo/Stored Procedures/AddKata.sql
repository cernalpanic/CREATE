CREATE PROCEDURE [dbo].[AddKata]
    @Description TEXT = '',
    @KataName TEXT = ''
AS
BEGIN
    DECLARE @KataID UNIQUEIDENTIFIER = NEWID()

    BEGIN
    -- Set date assigned to current date
        DECLARE @CurrentDate DATETIME = GETDATE()

        -- Insert the kata record
        INSERT INTO dbo.[Kata] 
        (KataID, [Description], [DateAssigned], [KataName]) 
        VALUES (@KataID, @Description, @CurrentDate, @KataName)

        -- Return the newly inserted kata
        SELECT * FROM dbo.[Kata] WHERE KataID = @KataID;
    END
END