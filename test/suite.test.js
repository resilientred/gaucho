"use strict";

const assert = require('chai').assert;
const sinon = require('sinon');

const Suite = require('../app/renderer/suite');
const Task = require('../app/renderer/task');

describe("Suite", () => {
    let taskStub;
    let testSuite;

    beforeEach(() => {
        taskStub = new Task("test", "", "command");
        testSuite = new Suite("Test");
        sinon.stub(taskStub, "getData").returns("taskStub");
    });

    afterEach(() => {
        taskStub.getData.restore();
    });

    it("Create New Suite", () => {
        let suite = new Suite("Suite Title");
        assert.strictEqual(suite.title, "Suite Title");
        assert.strictEqual(suite.length, 0);
    });

    it("Add and Remove Tasks", () => {
        assert.strictEqual(testSuite.length, 0);
        testSuite.addTask(taskStub);
        assert.strictEqual(testSuite.length, 1);
        testSuite.removeTask(0);
        assert.strictEqual(testSuite.length, 0);
        testSuite.removeTask(0);
        assert.strictEqual(testSuite.length, 0);
    });

    it.skip("Run Tasks", () => {

    });

    it.skip("Stop All Tasks", () => {

    });

    it("Replace Tasks", () => {
        testSuite.addTask(taskStub);
        testSuite.replaceTask(0, "secondTask");
        assert.strictEqual(testSuite.length, 1);
        assert.strictEqual(testSuite.tasks[0], "secondTask");
    });

    it("Get Data", () => {
        const suiteData = testSuite.getData();
        const expectedData = {
            title: "Test",
            tasks: []
        };

        assert.strictEqual(JSON.stringify(suiteData), JSON.stringify(expectedData));
    });
    it("Get Data With Tasks", () => {
        testSuite.addTask(taskStub);
        const suiteData = testSuite.getData();
        const expectedData = {
            title: "Test",
            tasks: ["taskStub"]
        };

        assert.strictEqual(JSON.stringify(suiteData), JSON.stringify(expectedData));
    });
});
