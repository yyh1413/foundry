import ContainerHeader from "@/components/containerHeader"
import { Card, Table, Tag, Button, Modal, Select, Input, Form } from "antd"
import { Activity, Box, Check, ChevronLeft, Database, FileCode, FileText, Folder, GitBranch, SkipForward } from "lucide-react"
import { useState } from "react"


export default function DataIngestion() {
	const [currentIndex, setCurrentIndex] = useState(884);
	const [totalTasks] = useState(1500);
	const [correction, setCorrection] = useState('');
	const [saving, setSaving] = useState(false);

	const progressPercentage = Math.round((currentIndex / totalTasks) * 100);

	const handleSubmit = () => {
		setSaving(true);
		// Simulate network request
		setTimeout(() => {
			setCurrentIndex(prev => prev < totalTasks ? prev + 1 : prev);
			setCorrection('');
			setSaving(false);
		}, 600);
	};



	return (
		<div className="h-full flex flex-col">
			<ContainerHeader title="数据精炼 - 工艺问答对 (SFT)">
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-3 text-sm text-slate-400">
						<span>Progress: <span className="text-white font-mono">{currentIndex}</span> / {totalTasks}</span>
						<div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
							<div className="bg-foundry-success h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
						</div>
					</div>
					<Button type="primary" size="small">导出数据集</Button>
				</div>
			</ContainerHeader>
			<div className="p-6 h-full overflow-auto">
				<div className=" max-w-[890px]  mx-auto flex flex-col gap-6">
					<Card className="bg-(--foundry-surface) border border-(--foundry-border)" title='原始文档 (Process Specs)'>
						<div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-slate-300 leading-relaxed font-mono">
							&gt; During the Etch step for Layer M1, if Critical Dimension (CD) bias exceeds 5nm, adjustments to the O2 flow rate in the main etch recipe are required.
							<br /><br />
							&gt; Excessive polymer buildup on the chamber walls (indicated by optical emission endpoint trace anomalies) often correlates with low etch selectivity.
							<br /><br />
							&gt; Recommended Action: Increase chamber clean frequency if polymer deposition rate 10nm/run.
						</div>
					</Card>
					<Card className="bg-(--foundry-surface) border border-(--foundry-border)" title='原始文档 (Process Specs)'>
						<div className="glass-panel p-6 rounded-xl border border-foundry-accent/30 bg-foundry-accent/5">
							<h3 className="text-xs font-bold text-foundry-accent uppercase tracking-wider mb-4">AI 生成问答对</h3>
							<div className="bg-foundry-accent/10 border border-foundry-accent/20 rounded-lg p-4 text-sm text-white leading-relaxed">
								<div className="mb-3"><strong>Q: What indicates low etch selectivity during the M1 layer etch process?</strong></div>
								<div>A: Low etch selectivity is often indicated by excessive polymer buildup on the chamber walls, which can be detected through anomalies in the optical emission endpoint trace.</div>
							</div>
						</div>
					</Card>
					<Card className="bg-(--foundry-surface) border border-(--foundry-border)" title='原始文档 (Process Specs)'>
						<div className="glass-panel p-6 rounded-xl border border-foundry-border">
							<h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6">人工审核</h3>

							<div className="mb-6">
								<label className="block text-xs text-slate-500 uppercase tracking-wider mb-3">问答质量 (Quality)</label>
								<div className="flex gap-4">
									{['Excellent', 'Good', 'Fair', 'Poor'].map((opt, i) => (
										<label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-slate-300 hover:text-white">
											<input type="radio" name="quality" className="accent-foundry-accent" defaultChecked={i === 0} /> {opt}
										</label>
									))}
								</div>
							</div>

							<div className="mb-6">
								<label className="block text-xs text-slate-500 uppercase tracking-wider mb-3">技术准确性 (Accuracy)</label>
								<div className="flex gap-4">
									{['Fully Accurate', 'Minor Errors', 'Hallucinated', 'Irrelevant'].map((opt, i) => (
										<label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-slate-300 hover:text-white">
											<input type="radio" name="accuracy" className="accent-foundry-accent" defaultChecked={i === 0} /> {opt}
										</label>
									))}
								</div>
							</div>

							<div className="mb-6">
								<label className="block text-xs text-slate-500 uppercase tracking-wider mb-3">专家修正 (Expert Correction)</label>
								<textarea
									className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white resize-none focus:border-foundry-accent outline-none transition-colors placeholder-slate-600 font-mono"
									rows={3}
									placeholder="Optional: Provide a better answer..."
									value={correction}
									onChange={(e) => setCorrection(e.target.value)}
								></textarea>
							</div>

							<div className="flex gap-3 pt-2">
								<Button type="primary" size="small" onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}><ChevronLeft className="w-4 h-4" /> Previous</Button>
								<Button type="primary" size="small" onClick={() => setCurrentIndex(prev => prev + 1)}><SkipForward className="w-4 h-4" /> Skip</Button>
								<div className="flex-1"></div>
								<Button type="primary" size="small" className="w-32" onClick={handleSubmit} disabled={saving}>
									{saving ? <Activity className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
									{saving ? 'Saving...' : 'Approve'}
								</Button>
							</div>
						</div>
					</Card>

				</div>
			</div>

		</div>

	)
}

