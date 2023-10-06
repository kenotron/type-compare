// Bundle of types from "lage" and packages it references.
// This file was generated by dts-bundle-generator and packages/lage/scripts/update-dts-bundle.js

import { Config as BackfillCacheOptions, CustomStorageConfig } from './backfill-config.js';
export interface F {
	a: string;
}

type LageBackfillCacheOptions = Omit<BackfillCacheOptions, "cacheStorageConfig"> & {
	cacheStorageConfig: Exclude<BackfillCacheOptions["cacheStorageConfig"], CustomStorageConfig>;
};
export type CacheOptions = LageBackfillCacheOptions & {
	environmentGlob: string[];
	cacheKey: string;
	writeRemoteCache: boolean;
	skipLocalCache: boolean;
};
export interface Priority {
	/** package name, as in package.json */
	package?: string;
	/** task name, as listed in the `scripts` section of package.json */
	task: string;
	/** priority, the higher the more priority; undefined priority means lowest priority*/
	priority: number;
}
interface Target {
	/**
	 * Unique ID of the target (e.g. "pkg-a#build")
	 */
	id: string;
	/**
	 * A display label of the target
	 */
	label: string;
	/**
	 * Working directory of the target - full path
	 */
	cwd: string;
	/**
	 * Name of the task for the target (e.g. "build", "test", "lint")
	 */
	task: string;
	/**
	 * Type of the target. If not specified, it will default to "npmScript". Determines the runner for the target.
	 */
	type?: string;
	/**
	 * Package name of the target. Undefined if this target is associated with repo root.
	 */
	packageName?: string;
	/**
	 * List of "dependency specs" like "^build", "build", "foo#build"
	 */
	depSpecs: string[];
	/**
	 * Dependencies of the target - these are the targets that must be complete before the target can be complete
	 */
	dependencies: string[];
	/**
	 * Dependents of the target - these are the targets that depend on this target
	 */
	dependents: string[];
	/**
	 * Any custom priority for the target. A priority of >0 will always be prioritized over the default targets in queue
	 */
	priority?: number;
	/**
	 * Outputs of this target (for cache purposes)
	 */
	outputs?: string[];
	/**
	 * Inputs for this target (for cache purposes)
	 */
	inputs?: string[];
	/**
	 * Whether to cache this target
	 */
	cache?: boolean;
	/**
	 * An optional override of environmentGlob for cases when targets that need different patterns
	 */
	environmentGlob?: string[];
	/**
	 * How many workers to dedicate to this task type
	 */
	maxWorkers?: number;
	/**
	 * Weight of a target - used to determine the number of "worker slots" to dedicate to a target
	 *
	 * Even if we have workers "free", we might not want to dedicate them to a target that is very heavy (i.e. takes multiple CPU cores).
	 * An example is jest targets that can take up multiple cores with its own worker pool.
	 *
	 */
	weight?: number;
	/**
	 * Run options for the Target
	 */
	options?: Record<string, any>;
	/**
	 * Whether the target should be displayed by reporters
	 */
	hidden?: boolean;
}
/**
 * Target configuration - to be used inside `lage.config.js` options.pipeline configurations
 */
export interface TargetConfig {
	/**
	 * The type of the target - The configuration parser will use the id of the target to determine the type.
	 * e.g. npmScript, worker
	 */
	type?: string;
	/**
	 * @deprecated - use `dependsOn` instead
	 *
	 * The dependencies of the target. Dependencies are target specs in one of these forms:
	 * - "pkg-a#build"
	 * - "build"
	 * - "^build"
	 * - "^^build"
	 */
	deps?: string[];
	/**
	 * The dependencies of the target. Dependencies are target specs in one of these forms:
	 * - "pkg-a#build"
	 * - "build"
	 * - "^build"
	 * - "^^build"
	 */
	dependsOn?: string[];
	/**
	 * Inputs for targets. This is used to determine the hash key for caching
	 */
	inputs?: string[];
	/**
	 * Outputs for targets. This is used to determine the files to be stored for caching
	 */
	outputs?: string[];
	/**
	 * Priority of the target. A priority of >0 will always be prioritized over the default targets in queue
	 */
	priority?: number;
	/**
	 * Whether to cache this target (defaults to true)
	 */
	cache?: boolean;
	/**
	 * An optional override of environmentGlob for cases when targets that need different patterns
	 */
	environmentGlob?: string[];
	/**
	 * How many workers to dedicate to this task type
	 */
	maxWorkers?: number;
	/**
	 * Weight of a target - used to determine the number of "worker slots" to dedicate to a target
	 *
	 * Even if we have workers "free", we might not want to dedicate them to a target that is very heavy (i.e. takes multiple CPU cores).
	 * An example is jest targets that can take up multiple cores with its own worker pool.
	 *
	 * This weight will be "culled" to the max number of workers (concurrency) for the target type. (i.e. maxWorkers above)
	 */
	weight?: number | ((target: Target, maxWorkers?: number) => number);
	/**
	 * Run options for the Target Runner. (e.g. `{ env: ...process.env, colors: true, ... }`)
	 */
	options?: Record<string, any>;
}
export interface PipelineDefinition {
	[task: string]: string[] | TargetConfig;
}
declare const LogLevel: {
	readonly error: 10;
	readonly warn: 20;
	readonly info: 30;
	readonly verbose: 40;
	readonly silly: 50;
};
type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
export interface LoggerOptions {
	disp?: {
		[level: string]: string;
	};
	style?: {
		[level: string]: {
			fg?: string;
			bg?: string;
		};
	};
	levels?: {
		[level: string]: LogLevel;
	};
}
export interface TargetRunnerPickerOptions {
	[key: string]: {
		script: string;
		options: any;
	};
}
type NpmClient = "npm" | "yarn" | "pnpm";
export interface ConfigOptions {
	/**
	 * Defines the task pipeline, prefix with "^" character to denote a direct topological dependency,
	 * prefix with ^^ to denote a transitive topological dependency.
	 *
	 * Example:
	 *
	 * ```
	 * {
	 *   build: ["^build"],
	 *   test: ["build"],
	 *   lint: []
	 *   bundle: ["^^transpile"],
	 *   transpile: [],
	 * }
	 * ```
	 */
	pipeline: PipelineDefinition;
	/** Backfill cache options */
	cacheOptions: CacheOptions;
	/** Which files to ignore when calculating scopes with --since */
	ignore: string[];
	/** disables --since flag when any of this list of files changed */
	repoWideChanges: string[];
	/** Which NPM Client to use when running npm lifecycle scripts */
	npmClient: NpmClient;
	/** Optional priority to set on tasks in a package to make the scheduler give priority to tasks on the critical path for high priority tasks */
	priorities: Priority[];
	/**
	 * Options that will be sent to all log reporters.
	 */
	loggerOptions: LoggerOptions;
	/**
	 * Custom runners for tasks in the pipeline. The key is the task name, and the value is a configuration describing what would be
	 * passed to the runner constructor.
	 */
	runners: TargetRunnerPickerOptions;
	/**
	 * Maximum worker idle memory, this would cause workers to restart if they exceed this limit. This is useful to prevent memory leaks.
	 */
	workerIdleMemoryLimit: number;
	/**
	 * Maximum number of concurrent tasks to run
	 */
	concurrency: number;
	/**
	 * Allows for no targets run
	 */
	allowNoTargetRuns: boolean;
}

export {};