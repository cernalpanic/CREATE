CREATE PROCEDURE [dbo].[GetQuests]
AS
BEGIN
	SELECT QuestID, ModuleID, [Name], [Description], ExpGain
	FROM dbo.[Quest]
	ORDER BY [Name]
END