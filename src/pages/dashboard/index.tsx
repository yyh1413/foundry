
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, LineChart, Line } from 'recharts';
import { Activity, Database, Cpu, Server, Zap, Terminal, HardDrive, Network } from 'lucide-react';

// Initial Mock Data Generators
const generateInitialLoss = () => {
	const data = [];
	let val = 2.5;
	for (let i = 0; i < 60; i++) {
		val = val * 0.95 + (Math.random() * 0.1 - 0.05); // Exponential decay with noise
		data.push({ step: i, value: Math.max(0.1, val) });
	}
	return data;
};

const ingestionData = [
	{ time: '10:00', mbps: 450 },
	{ time: '10:05', mbps: 520 },
	{ time: '10:10', mbps: 480 },
	{ time: '10:15', mbps: 600 },
	{ time: '10:20', mbps: 580 },
	{ time: '10:25', mbps: 750 },
	{ time: '10:30', mbps: 710 },
	{ time: '10:35', mbps: 680 },
];

const initialGpuNodes = Array.from({ length: 16 }, (_, i) => ({
	id: i,
	load: 30 + Math.random() * 40,
	status: 'active'
}));

const tasks = [
	{ id: 'job-8821', name: 'Train: GPT-FineTune-v2', status: 'running', time: '2h 15m' },
	{ id: 'job-8820', name: 'Ingest: S3 Batch Import', status: 'running', time: '45m' },
	{ id: 'job-8819', name: 'Vector Indexing: Shard 04', status: 'completed', time: '12m ago' },
	{ id: 'job-8818', name: 'Model Eval: Checkpoint 500', status: 'completed', time: '1h ago' },
	{ id: 'job-8817', name: 'System Backup: Daily', status: 'completed', time: '4h ago' },
	{ id: 'job-8816', name: 'ETL: Fab 2 Logs', status: 'completed', time: '5h ago' },
];

export default function Dashboard() {
	// Dynamic States
	const [lossData, setLossData] = useState(generateInitialLoss());
	const [currentLoss, setCurrentLoss] = useState(0.3502);
	const [gpuNodes, setGpuNodes] = useState(initialGpuNodes);
	const [activeTaskIndex, setActiveTaskIndex] = useState(0);
	const [stepCounter, setStepCounter] = useState(60);

	// 1. Dynamic Loss Curve Simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setLossData(prev => {
				const lastVal = prev[prev.length - 1].value;
				// Simulate convergence with random fluctuation
				const change = (Math.random() * 0.06) - 0.035;
				let newVal = Math.max(0.1, lastVal + change);

				// Smoothly update current loss display
				setCurrentLoss(newVal);

				const newStep = stepCounter;
				// Keep window size constant
				const newData = [...prev.slice(1), { step: newStep, value: newVal }];
				return newData;
			});
			setStepCounter(prev => prev + 1);
		}, 800); // Updates every 800ms

		return () => clearInterval(interval);
	}, [stepCounter]);

	// 2. Real-time GPU Topology Simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setGpuNodes(prev => prev.map(node => {
				// Random load fluctuation
				let newLoad = node.load + (Math.random() * 30 - 15);
				newLoad = Math.max(5, Math.min(98, newLoad));
				return { ...node, load: newLoad };
			}));
		}, 1500);
		return () => clearInterval(interval);
	}, []);

	// 3. Auto-scrolling Task Log
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveTaskIndex(prev => (prev + 1) % tasks.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="h-full w-full overflow-y-auto p-8 bg-foundry-bg/50">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1800px] mx-auto">

				{/* Widget 1: Global Training Loss (Dynamic Chart) */}
				<div className="col-span-2 glass-panel rounded-[2rem] p-6 border border-white/5 hover:border-white/10 transition-all duration-500 bg-gradient-to-br from-foundry-surface to-foundry-bg shadow-2xl group relative overflow-hidden">
					<div className="absolute top-0 right-0 w-64 h-64 bg-foundry-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-foundry-primary/20 transition-all"></div>

					<div className="flex justify-between items-start mb-4 relative z-10">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-foundry-primary/20 flex items-center justify-center text-foundry-primary border border-foundry-primary/30">
								<Activity className="w-5 h-5" />
							</div>
							<div>
								<h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider font-mono">Global Training Loss</h3>
								<span className="text-xs text-foundry-success flex items-center gap-1">
									Running Job: <span className="text-white font-mono">Job-X92</span>
								</span>
							</div>
						</div>
						<div className="text-right">
							<div className="text-4xl font-light text-white tracking-tight font-mono transition-all duration-500">
								{currentLoss.toFixed(4)}
							</div>
							<div className="text-[10px] text-slate-500 uppercase tracking-widest">Converging</div>
						</div>
					</div>

					<div className="h-32 w-full">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={lossData}>
								<defs>
									<linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#1A5490" stopOpacity={0.5} />
										<stop offset="95%" stopColor="#1A5490" stopOpacity={0} />
									</linearGradient>
								</defs>
								<Tooltip
									contentStyle={{ background: 'rgba(26, 30, 58, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontFamily: 'monospace' }}
									itemStyle={{ color: '#fff' }}
									cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeDasharray: '5 5' }}
									labelStyle={{ display: 'none' }}
								/>
								<Area
									type="monotone"
									dataKey="value"
									stroke="#1A5490"
									strokeWidth={3}
									fill="url(#colorLoss)"
									isAnimationActive={false}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Widget 2: Platform Storage */}
				<div className="glass-panel rounded-[2rem] p-6 border border-white/5 bg-gradient-to-br from-[#1A1E3A] to-[#0f1121] hover:translate-y-[-2px] transition-all duration-300">
					<div className="flex justify-between items-start mb-6">
						<div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
							<Database className="w-5 h-5" />
						</div>
						<div className="text-right">
							<div className="text-2xl font-medium text-white font-mono">84.5 TB</div>
							<div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Platform Storage</div>
						</div>
					</div>
					<div className="space-y-4 font-mono">
						<div>
							<div className="flex justify-between text-[10px] mb-1.5 uppercase tracking-wide">
								<span className="text-slate-400 flex items-center gap-1"><HardDrive className="w-3 h-3" /> Object Store (S3)</span>
								<span className="text-white">52.1 TB</span>
							</div>
							<div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
								<div className="bg-blue-500 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '65%' }}></div>
							</div>
						</div>
						<div>
							<div className="flex justify-between text-[10px] mb-1.5 uppercase tracking-wide">
								<span className="text-slate-400 flex items-center gap-1"><Network className="w-3 h-3" /> Vector DB (Milvus)</span>
								<span className="text-white">21.4 TB</span>
							</div>
							<div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
								<div className="bg-cyan-500 h-full rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: '40%' }}></div>
							</div>
						</div>
					</div>
				</div>

				{/* Widget 3: GPU Cluster Topology (Topology Map) */}
				<div className="glass-panel rounded-[2rem] p-6 border border-white/5 bg-gradient-to-br from-[#1A1E3A] to-[#0f1121] hover:translate-y-[-2px] transition-all duration-300 group">
					<div className="flex justify-between items-start mb-4">
						<div className="w-10 h-10 rounded-full bg-foundry-secondary/10 flex items-center justify-center text-foundry-secondary border border-foundry-secondary/20">
							<Cpu className="w-5 h-5" />
						</div>
						<div className="text-right">
							<div className="text-2xl font-medium text-white font-mono">16 / 16</div>
							<div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Active GPUs</div>
						</div>
					</div>

					{/* Topology Grid Visualization */}
					<div className="grid grid-cols-8 gap-2 h-24 mt-2">
						{gpuNodes.map((node) => (
							<div key={node.id} className="relative group/node">
								<div className={`
                            w-full h-full rounded-sm border transition-all duration-700 flex items-end overflow-hidden
                            ${node.load > 90
										? 'bg-foundry-error/10 border-foundry-error/40 shadow-[0_0_8px_rgba(255,68,68,0.2)]'
										: 'bg-foundry-primary/10 border-foundry-primary/30'}
                         `}>
									{/* Load Bar inside Node */}
									<div
										className={`w-full transition-all duration-700 ${node.load > 90 ? 'bg-foundry-error' : 'bg-[#ff6b35]'}`}
										style={{ height: `${node.load}%`, opacity: 0.6 }}
									></div>
								</div>

								{/* Status Dot */}
								<div className={`absolute top-1 right-1 w-1 h-1 rounded-full ${node.load > 90 ? 'bg-red-400 animate-ping' : 'bg-green-400'}`}></div>
							</div>
						))}
					</div>

					<div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest mt-3 font-mono">
						<span>NODE-01</span>
						<span className="text-foundry-text-secondary opacity-50">LOAD DISTRIBUTION</span>
						<span>NODE-16</span>
					</div>
				</div>

				{/* Widget 4: Ingestion Throughput */}
				<div className="glass-panel rounded-[2rem] p-6 border border-white/5 bg-gradient-to-br from-[#1A1E3A] to-[#0f1121] hover:translate-y-[-2px] transition-all duration-300">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
							<Zap className="w-5 h-5" />
						</div>
						<div>
							<div className="text-sm text-slate-300 uppercase tracking-wide font-medium">Ingestion Rate</div>
							<div className="text-xs text-slate-500">Real-time Events</div>
						</div>
					</div>
					<div className="flex items-baseline gap-2 mb-2">
						<span className="text-3xl font-light text-white font-mono">750</span>
						<span className="text-xs text-slate-500 font-mono">MB/s</span>
					</div>
					<div className="h-16">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={ingestionData}>
								<Line type="step" dataKey="mbps" stroke="#00D4AA" strokeWidth={2} dot={false} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Widget 5: Platform Status */}
				<div className="col-span-2 glass-panel rounded-[2rem] p-6 border border-white/5 bg-gradient-to-r from-foundry-primary/5 to-transparent flex items-center justify-between hover:bg-white/5 transition-all duration-300 group">
					<div className="flex items-center gap-6">
						<div className="h-16 w-16 rounded-2xl bg-foundry-surface border border-foundry-border flex items-center justify-center shadow-lg group-hover:border-foundry-primary/50 transition-colors">
							<Server className="w-8 h-8 text-white" />
						</div>
						<div>
							<h3 className="text-lg font-medium text-white">Platform Status</h3>
							<div className="flex gap-4 mt-2 text-xs">
								<span className="flex items-center gap-1.5 text-slate-300"><span className="w-1.5 h-1.5 rounded-full bg-foundry-success shadow-[0_0_5px_#00D4AA]"></span> API Gateway</span>
								<span className="flex items-center gap-1.5 text-slate-300"><span className="w-1.5 h-1.5 rounded-full bg-foundry-success shadow-[0_0_5px_#00D4AA]"></span> Scheduler</span>
								<span className="flex items-center gap-1.5 text-slate-300"><span className="w-1.5 h-1.5 rounded-full bg-foundry-success shadow-[0_0_5px_#00D4AA]"></span> Vector Search</span>
							</div>
						</div>
					</div>
					<div className="flex gap-8 pr-8 border-l border-white/10 pl-8">
						<div className="text-center">
							<div className="text-2xl font-mono text-white">450ms</div>
							<div className="text-[10px] uppercase tracking-wider text-slate-500">Avg Latency</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-mono text-foundry-success">99.99%</div>
							<div className="text-[10px] uppercase tracking-wider text-slate-500">SLA Uptime</div>
						</div>
					</div>
				</div>

				{/* Widget 6: Scrolling Task Log */}
				<div className="col-span-1 glass-panel rounded-[2rem] p-6 border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all overflow-hidden relative">
					<div className="flex justify-between items-center mb-4 z-10 relative">
						<h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
							<Terminal className="w-4 h-4" /> System Activity
						</h3>
						<div className="flex gap-1">
							<span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
							<span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
						</div>
					</div>

					<div className="space-y-3 relative h-32 overflow-hidden">
						{/* Mask for gradient fade out */}
						{/* <div className="absolute inset-0 z-10 pointer-events-none "></div> */}

						{/* Scrolling List */}
						<div className="absolute w-full transition-all duration-700 ease-in-out" style={{ transform: `translateY(-${activeTaskIndex * 56}px)` }}>
							{tasks.concat(tasks).map((task, i) => (
								<div key={`${task.id}-${i}`} className="h-[56px] flex items-center gap-3 border-b border-white/5 last:border-0 mb-2">
									<div className={`w-1 h-8 rounded-full ${task.status === 'running' ? 'bg-foundry-secondary animate-pulse' : 'bg-foundry-primary'}`}></div>
									<div className="flex-1 min-w-0">
										<div className="text-sm text-white truncate font-medium">{task.name}</div>
										<div className="text-[10px] text-slate-500 font-mono flex justify-between">
											<span className="uppercase">{task.status}</span>
											<span>{task.time}</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};
