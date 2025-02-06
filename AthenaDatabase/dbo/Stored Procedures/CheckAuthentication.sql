CREATE PROCEDURE [dbo].[CheckAuthentication]
	@TokenID uniqueidentifier
AS
BEGIN
	DECLARE @Result bit
	IF EXISTS(SELECT TokenID FROM dbo.[Authentication] WHERE TokenID = @TokenID)
	BEGIN
		DECLARE @ExpiryDate datetime = (SELECT Expires FROM dbo.[Authentication] WHERE TokenID = @TokenID)
		IF(GETDATE() > @ExpiryDate)
		BEGIN
			-- This means we're past the expiry date so authentication must be removed
			EXEC DeleteAuthentication @TokenID

			-- Return false to indicate they are not authenticated and should be logged out
			SET @Result = 0
		END
		ELSE
		BEGIN
			-- Return true to indicate they are authenticated
			SET @Result = 1
		END
	END
	ELSE
	BEGIN
		-- Their token could not be found so they are not authenticated and should be logged out
		SET @Result = 0
	END
	SELECT @Result
END
