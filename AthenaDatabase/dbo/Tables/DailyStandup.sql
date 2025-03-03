CREATE TABLE [dbo].[DailyStandup] (
    [StandupID] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [StudentID] UNIQUEIDENTIFIER NOT NULL,
    [UserID] UNIQUEIDENTIFIER NOT NULL,
    [DateCreated] DATETIME NOT NULL, 
    [YesterdayTask] NVARCHAR(MAX) NULL,
    [TodayPlan] NVARCHAR(MAX) NULL, 
    [Blockers] NVARCHAR(MAX) NULL, 
    [AdminFeedback] NVARCHAR(MAX) NULL, 
    CONSTRAINT [FK_DailyStandup_Student] FOREIGN KEY ([StudentID], [UserID]) REFERENCES [dbo].[Student] ([StudentID], [UserID])
);
