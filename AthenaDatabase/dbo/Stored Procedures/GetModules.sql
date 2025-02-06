CREATE PROCEDURE [dbo].[GetModules]
AS
BEGIN
	SELECT ModuleID, [Name], Color, [Description]
	FROM dbo.[Module]
	ORDER BY [Name]
END