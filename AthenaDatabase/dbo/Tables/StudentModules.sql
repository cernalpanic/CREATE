CREATE TABLE [dbo].[StudentModules]
(
	[StudentID] UNIQUEIDENTIFIER NOT NULL, 
    [ModuleID] UNIQUEIDENTIFIER NOT NULL, 
    [Completed] BIT NOT NULL,
    CONSTRAINT [PK_StudentModules] PRIMARY KEY CLUSTERED ([StudentID] ASC, [ModuleID] ASC)
)
