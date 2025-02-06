CREATE PROCEDURE [dbo].[AddDailyStandup]
    @StudentID UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @StandupID UNIQUEIDENTIFIER = NEWID()
    DECLARE @UserID UNIQUEIDENTIFIER

    -- Get the UserID associated with the provided StudentID
    SELECT @UserID = UserID FROM dbo.Student WHERE StudentID = @StudentID

    -- Ensure the StudentID exists in the Student table
    IF @UserID IS NOT NULL
    BEGIN
        DECLARE @CurrentDate DATETIME = GETDATE()

        -- Insert the daily standup record
        INSERT INTO dbo.[DailyStandup] 
        (StandupID, StudentID, UserID, [DateCreated], [Description]) 
        VALUES (@StandupID, @StudentID, @UserID, @CurrentDate, '')

        -- Return the newly inserted daily standup
        SELECT * FROM dbo.[DailyStandup] WHERE StandupID = @StandupID;
    END
    ELSE
    BEGIN
        -- If the provided StudentID does not exist, return an empty result set
        SELECT 'Invalid StudentID' AS [Error];
    END
END