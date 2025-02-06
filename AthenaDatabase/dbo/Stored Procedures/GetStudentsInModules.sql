CREATE PROCEDURE [dbo].[GetStudentsInModules]
AS
BEGIN
	SELECT COUNT(StudentID) AS TotalStudents, module.ModuleID, Module.[Name]
	FROM dbo.[Module] AS module 
	JOIN dbo.[StudentModules] AS stmod ON module.ModuleID = stmod.ModuleID
	GROUP BY module.ModuleID, Module.Name
END