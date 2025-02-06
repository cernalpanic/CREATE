CREATE PROCEDURE [dbo].[DeleteAuthentication]
	@TokenID uniqueidentifier
AS
BEGIN
	DELETE FROM dbo.[Authentication] WHERE TokenID = @TokenID
END
