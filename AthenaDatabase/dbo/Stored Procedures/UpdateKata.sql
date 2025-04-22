CREATE PROCEDURE [dbo].[UpdateKata]
	@KataID uniqueidentifier,
    @Description TEXT,
    @KataName TEXT
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS (SELECT 1 FROM dbo.Kata WHERE KataID = @KataID
    )

	BEGIN
		UPDATE dbo.[Kata]
		SET [Description] = @Description, [KataName] = @KataName
		WHERE KataID = @KataID
		
		SET @Result = 1		-- Returns true (update was successful)
	END
	ELSE
	BEGIN
		SET @Result = 0		-- Returns false (update was not successful)
	END
	SELECT @Result
END