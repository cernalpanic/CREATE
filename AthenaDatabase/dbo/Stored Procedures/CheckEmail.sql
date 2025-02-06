CREATE PROCEDURE [dbo].[CheckEmail]
	@Email nvarchar(500)
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS(SELECT * FROM dbo.[User] WHERE Email = @Email)
	BEGIN
		SET @Result = 1
	END
	ELSE
	BEGIN
		SET @Result = 0
	END
	
	SELECT @Result
END