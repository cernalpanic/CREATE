CREATE PROCEDURE [dbo].[GetKataExamples]
	@KataID uniqueidentifier
AS
BEGIN
	SELECT KataID, ExampleCode
	FROM dbo.[KataExamples]
	WHERE KataID = @KataID
END