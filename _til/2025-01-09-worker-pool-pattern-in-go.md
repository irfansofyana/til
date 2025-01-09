---
layout: post
title: worker pool pattern in go
date: 2025-01-09
category: go
description: How we implement a simple worker pool pattern in go
tags: [go, concurrency]
---

## What I learned

I have been learning go for a while and always amaze by the simplicity of implementing concurrency. Today I relearned again about one of the concurrency patterns, worker pool.

With this pattern, we can easily create a pool of workers that can listen for incoming tasks and execute them concurrently. It's very useful if we have a heavy task that we want to execute asynchronously, like sending emails, processing docs, etc..

In this example I tried to add some exponential backoff to ilustrate how we can handle failed tasks until we give up. Another important note here is we use buffered channel so that we can avoid blocking as long as the worker pool is not full. Generally it can be useful to increase responsiveness and throughput.

```go
    package main

    import (
        "fmt"
        "log"
        "math"
        "math/rand"
        "sync"
        "time"
    )

    // Task is an interface that represent a task that needs to be executed
    type Task interface {
        Execute() error
        GetID() string
    }

    // EmailTask is a task that represent a task to send an email
    type EmailTask struct {
        ID      string
        To      string
        Subject string
        Body    string
    }

    // Execute executes the email task
    func (t *EmailTask) Execute() error {
        if rand.Float64() < 0.3 {
            return fmt.Errorf("Task %s failed to execute", t.ID)
        }

        log.Println("TASK ID:", t.ID, "DONE", "Email sent to", t.To, "with subject", t.Subject, "and body", t.Body)
        return nil
    }

    // TaskID returns the task ID
    func (t *EmailTask) GetID() string {
        return t.ID
    }

    // RetryConfig is a struct config for exponential backoff
    type RetryConfig struct {
        MaxRetries int
        BaseDelay  time.Duration
        Factor     float64
    }

    func doTaskWithExponentialBackoff(task Task, config RetryConfig) error {
        for i := 0; i < config.MaxRetries; i++ {
            err := task.Execute()
            if err == nil {
                return nil
            }

            if i < config.MaxRetries {
                backoffDuration := time.Duration(
                    float64(config.BaseDelay) * math.Pow(config.Factor, float64(i)),
                )

                log.Printf("[TASK: %s] Attempt %d failed. Retrying in %s...", task.GetID(), i, backoffDuration)
                time.Sleep(backoffDuration)
            }
        }

        return fmt.Errorf("[TASK: %s] failed after maximum retries", task.GetID())
    }

    type WorkerPool struct {
        jobs        chan Task
        wg          sync.WaitGroup
        workers     int
        retryConfig RetryConfig
        bufferSize  int
    }

    // NewWorkerPool creates a new worker pool with a buffered channel
    func NewWorkerPool(numWorkers int, bufferSize int, retryConfig RetryConfig) *WorkerPool {
        return &WorkerPool{
            jobs:        make(chan Task, bufferSize),
            workers:     numWorkers,
            retryConfig: retryConfig,
            wg:          sync.WaitGroup{},
            bufferSize:  bufferSize,
        }
    }

    // Start starts the worker pool
    func (wp *WorkerPool) Start() {
        for i := 0; i < wp.workers; i++ {
            wp.wg.Add(1)

            go func(workerID int) {
                defer wp.wg.Done()
                for task := range wp.jobs {
                    err := doTaskWithExponentialBackoff(task, wp.retryConfig)
                    if err != nil {
                        log.Printf("Worker %d failed to execute task: %v", workerID, err)
                    }
                }
            }(i)
        }
    }

    // Submit submits a task to the worker pool
    func (wp *WorkerPool) Submit(task Task) {
        wp.jobs <- task
    }

    // Stop stops the worker pool
    func (wp *WorkerPool) Stop() {
        close(wp.jobs)
        wp.wg.Wait()
    }

    func main() {
        cfg := RetryConfig{
            MaxRetries: 3,
            BaseDelay:  500 * time.Millisecond,
            Factor:     2.0,
        }

        // create a worker pool consist of 3 workers and a buffer size of 10
        pool := NewWorkerPool(3, 10, cfg)
        pool.Start()

        // Enqueue some email tasks
        for i := 1; i <= 20; i++ {
            pool.Submit(&EmailTask{
                ID:      fmt.Sprintf("%d", i),
                To:      fmt.Sprintf("user_%d", i),
                Subject: fmt.Sprintf("Hello from user %d", i),
                Body:    "Hello, this is a test email.",
            })
        }

        pool.Stop()
        fmt.Println("All tasks have been submitted and processed.")
    }
```

## Some references

- <https://stackoverflow.com/questions/15113410/when-to-use-a-buffered-channel>

- <https://softwarepatternslexicon.com/patterns-go/5/1/>