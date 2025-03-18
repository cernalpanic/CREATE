CREATE PROCEDURE [dbo].[GetKatas]
	@KataID uniqueidentifier
AS
BEGIN
	SELECT KataID, [Description], DateAssigned, KataName
	FROM dbo.[Kata]
	WHERE KataID = @KataID
END